#pragma once

#include "cpprest/http_listener.h"


#include <array>
#include <map>
#include <string>

#include <functional>

#include "strConstant.h"

class BlackScholesHandler {

	private:
		/// <summary>
		///		An array of expected parameters for black-scholes request
		/// </summary>
		inline static const std::array<std::string, 5> expectedParams{ str::params::SPOT, str::params::STRIKE, str::params::INTEREST_RATE, str::params::VOLATILITY,  str::params::TIME_TO_MATURITY };
		

		/// <summary>
		///		A function that reply to the http request 
		/// </summary>
		/// <param name="req">http request</param>
		/// <param name="pricingFunction">pricing function to execute</param>
		static void handle(const web::http::http_request& req, const std::function<double(double, double, double, double, double)>& pricingFunction);
		
	public:
		/// <summary>
		///		A function who get a http request and return its query string as a map
		/// </summary>
		/// <param name="req">htttp request </param>
		/// <returns>query string map</returns>
		static std::map<utility::string_t, utility::string_t> getReqQueryStringMap(const web::http::http_request& req);


		/// <summary>
		///		A function who validate query string params of the http request
		/// </summary>
		/// <param name="req">http request</param>
		/// <returns>a boolean value to say whether or not the params are valid</returns>
		static bool validateReqParams(const web::http::http_request& req);


		/// <summary>
		///		A function who convert req query string map of type <string_t, string_t> to a map of type <string, string>
		/// </summary>
		/// <param name="req">the http request</param>
		/// <returns>the map of type<string, string> </returns>
		static std::map<std::string, double> convertReqParamsMap(const web::http::http_request& req);


		/// <summary>
		///		A function that reply to the http request for a put pricing
		/// </summary>
		/// <param name="req">http request</param>
		static void handlePricingPut(const web::http::http_request& req);


		/// <summary>
		///		A function that reply to the http request for a call pricing
		/// </summary>
		/// <param name="req">http request</param>
		static void handlePrincingCall(const web::http::http_request& req);
};