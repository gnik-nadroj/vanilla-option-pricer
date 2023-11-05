#pragma once

#include <router.hpp>

namespace pricer::api {
	void startServer(const utility::string_t& port);
	core::router::HandleFunction generateApiRoutes();
	void shutDown();
}
