#include "BlackScholesHandler.h"
#include "BlackScholes.h"

std::map<utility::string_t, utility::string_t> BlackScholesHandler::getReqQueryStringMap(const web::http::http_request& req){
	const utility::string_t requestQueryString = req.absolute_uri().query();
	const auto& requestQueryStringMap{ web::uri::split_query(requestQueryString) };

	return requestQueryStringMap;
}

bool BlackScholesHandler::validateReqParams(const web::http::http_request& req){
	const auto& reqQueryStringMap{ getReqQueryStringMap(req) };

	for (const auto& name : expectedParams) {
		const auto& stringTname{ utility::conversions::to_string_t(name) };
		
		if (const auto& itr{ reqQueryStringMap.find(stringTname) }; itr == reqQueryStringMap.end())
			return false;
		else {
			try {
				std::ignore = std::stod(itr->second);
			}
			catch (const std::exception&) {
				return false;
			}
		}
	}

	return true;
}

std::map<std::string, double> BlackScholesHandler::convertReqParamsMap(const web::http::http_request& req){
	const auto& reqQueryStringMap{ getReqQueryStringMap(req) };

	std::map<std::string, double> convertedMap{};

	for (const auto& name : expectedParams) {
		const auto& stringTname{ utility::conversions::to_string_t(name) };
		convertedMap[name] = std::stod(reqQueryStringMap.at(stringTname));
	}

	return convertedMap;
}

void BlackScholesHandler::handle(const web::http::http_request &req, const std::function<double(double, double, double, double, double)> &pricingFunction){
	web::json::value jsonResponse;
	web::http::status_code responseStatus;
	

	if (validateReqParams(req)) {
		auto params = convertReqParamsMap(req);
		auto price = pricingFunction(params[str::params::STRIKE], params[str::params::SPOT], 
										params[str::params::INTEREST_RATE], params[str::params::VOLATILITY], params[str::params::TIME_TO_MATURITY]);

		
		jsonResponse[utility::conversions::to_string_t("result")][utility::conversions::to_string_t("price")] = web::json::value::string(utility::conversions::to_string_t(std::to_string(price)));
		responseStatus = web::http:: status_codes::OK;
	}

	else {
		jsonResponse[utility::conversions::to_string_t("message")] = web::json::value::string(utility::conversions::to_string_t("invalid data"));
		responseStatus = web::http::status_codes::BadRequest;
	}

	req.reply(responseStatus, jsonResponse);
}

void BlackScholesHandler::handlePricingPut(const web::http::http_request& req){
	return handle(req, BlackScholes::put);
}

void BlackScholesHandler::handlePrincingCall(const web::http::http_request& req){
	return handle(req, BlackScholes::call);
}


