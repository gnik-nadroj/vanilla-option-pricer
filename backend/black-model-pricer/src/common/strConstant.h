#pragma once
#include <string>

namespace str {
	namespace params {
		const static std::string STRIKE = "strike";
		const static std::string SPOT = "spot";
		const static std::string INTEREST_RATE = "interestRate";
		const static std::string VOLATILITY = "volatility";
		const static std::string TIME_TO_MATURITY = "timeToMaturity";
	};

	namespace route {
		const static std::string CALL_ROUTE = "/call";
		const static std::string PUT_ROUTE = "/put";
		const static std::string BLACK_SCHOLES_ROUTE = "/black-scholes";
		const static std::string BASE_ROUTE = "/pricer";
	};

	namespace {
		const static std::string ROUTER = "router";
		const static std::string GET = "get";
		const static std::string POST = "post";
	};

	namespace app {
		const static std::string PROTOCOL = "http";
		const static std::string HOST = "0.0.0.0";
		const static std::string PORT = "34566";
	}
}



