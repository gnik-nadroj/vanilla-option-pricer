#pragma once
#include <string>

namespace pricer::str {
	namespace params {
		extern const std::string STRIKE;
		extern const std::string SPOT;
		extern const std::string INTEREST_RATE;
		extern const std::string VOLATILITY;
		extern const std::string TIME_TO_MATURITY;
	}

	namespace route {
		extern const  std::string CALL_ROUTE;
		extern const  std::string PUT_ROUTE;
		extern const  std::string BLACK_SCHOLES_ROUTE;
		extern const  std::string BASE_ROUTE;
	}

	namespace config {
		extern const std::string PROTOCOL;
		extern const std::string HOST;
		extern const std::string PORT;
	}

	namespace router {
		extern const std::string GET;
		extern const std::string POST;
		extern const std::string ROUTER;
	}

	namespace error {
		extern const std::string ILL_FORMED_REQUEST;
		extern const std::string NOT_FOUND;
	}
}
