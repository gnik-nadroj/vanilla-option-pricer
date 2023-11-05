#include "str.hpp"

namespace pricer::str {
	namespace params {
		const std::string STRIKE = "strike";
		const std::string SPOT = "spot";
		const std::string INTEREST_RATE = "interestRate";
		const std::string VOLATILITY = "volatility";
		const std::string TIME_TO_MATURITY = "timeToMaturity";
	}

	namespace route {
		const std::string CALL_ROUTE = "/call";
		const std::string PUT_ROUTE = "/put";
		const std::string BLACK_SCHOLES_ROUTE = "/black-scholes";
		const std::string BASE_ROUTE = "/pricer";
	}

	namespace config {
		const std::string PROTOCOL = "http";
		const std::string HOST = "0.0.0.0";
		const std::string PORT = "34566";
	}

	namespace router {
		const std::string GET = "get";
		const std::string POST = "post";
		const std::string ROUTER = "router";
	}

	namespace error {
		const std::string ILL_FORMED_REQUEST = "the request is ill-formed";
		const std::string NOT_FOUND = "Not Found";
	}
}
