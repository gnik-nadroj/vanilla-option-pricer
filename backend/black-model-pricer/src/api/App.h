#pragma once
#include <cpprest/json.h>
#include <PricingServer.h>
#include <Router.h>

namespace app {
	void StartServer(const utility::string_t& port);
	Router GenerateApiRoutes();
	void ShutDown();
}
