#pragma once

#include <router.hpp>

namespace pricer::api {
	void startServer(const std::string& port);
	core::router::HandleFunction generateApiRoutes();
	void shutDown();
}
