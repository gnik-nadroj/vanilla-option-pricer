#include "black-model-handler.hpp"

#include <black-model.hpp>

namespace pricer::api::request_handler::black_model_handler {
	bool BlackModelHandler::checkRequestParams(const RequestParams& requestParams){
		for(const auto& expectedParam : expectedParams) {
			if(!requestParams.contains(expectedParam)) 
				return false;
		}

		return true;
	}

	std::unique_ptr<RequestParams> BlackModelHandler::getRequestParams(const web::http::http_request& req){
		auto requestParams{ web::uri::split_query(req.absolute_uri().query()) };

		RequestParams convertedRequestParams {};

		for (auto &[name, value]: requestParams) {
			double convertedValue {};
			
			try {
				convertedValue = std::stod(value);
			} catch(const std::exception& e) {
				return nullptr;
			}

			convertedRequestParams[name] = convertedValue;
		}

		auto isValid = checkRequestParams(convertedRequestParams);

		return isValid ? std::make_unique<RequestParams>(convertedRequestParams) : nullptr;
	}

	void BlackModelHandler::handle(const web::http::http_request &req, const std::function<double(double, double, double, double, double)> &pricingFunction){
		web::json::value jsonResponse;
		web::http::status_code responseStatus;
		
		if (auto requestParams = getRequestParams(req)) {
			auto price = pricingFunction(requestParams->at(pricer::str::params::STRIKE), requestParams->at(pricer::str::params::SPOT), 
												requestParams->at(pricer::str::params::INTEREST_RATE), requestParams->at(pricer::str::params::VOLATILITY), requestParams->at(pricer::str::params::TIME_TO_MATURITY));
			
			jsonResponse["result"]["price"] = web::json::value::string(std::to_string(price));

			responseStatus = web::http:: status_codes::OK;
		}
		else {
			jsonResponse["message"] = web::json::value::string("request ill-formed");
			responseStatus = web::http::status_codes::BadRequest;
		}

		req.reply(responseStatus, jsonResponse);
	}

	void BlackModelHandler::handlePricingPut(const web::http::http_request& req){
		return handle(req, pricer::model::black_model::put);
	}

	void BlackModelHandler::handlePrincingCall(const web::http::http_request& req){
		return handle(req, pricer::model::black_model::call);
	}
}
