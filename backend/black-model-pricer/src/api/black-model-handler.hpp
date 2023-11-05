#pragma once

#include <str.hpp>

#include <cpprest/http_listener.h>

#include <array>
#include <map>
#include <string>
#include <functional>

namespace pricer::api::request_handler::black_model_handler {
	using RequestParams = std::map<std::string, double>;
	using PricingFunction = std::function<double(double, double, double, double, double)>;

	class BlackModelHandler {
	private:
		inline static const std::array<std::string, 5> expectedParams{ pricer::str::params::SPOT, pricer::str::params::STRIKE, pricer::str::params::INTEREST_RATE, pricer::str::params::VOLATILITY,  pricer::str::params::TIME_TO_MATURITY };
		
		static void handle(const web::http::http_request& req, const PricingFunction& pricingFunction);

		static std::unique_ptr<RequestParams> getRequestParams(const web::http::http_request& req);

		static bool checkRequestParams(const RequestParams& requestParams);
		
	public:
		static void handlePricingPut(const web::http::http_request& req);

		static void handlePrincingCall(const web::http::http_request& req);
};
}


