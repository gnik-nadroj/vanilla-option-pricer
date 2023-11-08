#include "api.hpp"
#include "black-model-handler.hpp"

#include <server.hpp>

#include <str.hpp>

#include <memory>

namespace pricer::api {

	std::unique_ptr<core::Server> g_http;

	void startServer(const std::string& port) {
	 	web::uri_builder uri;
		
		uri.set_port(port);
		uri.set_scheme(str::config::PROTOCOL);
		uri.set_host(str::config::HOST);
		uri.set_path(str::route::BASE_ROUTE);

		auto addr = uri.to_uri().to_string();

		auto serverConfig = web::http::experimental::listener::http_listener_config();
		serverConfig.set_timeout(utility::seconds(30));

		g_http = std::make_unique<core::Server>(addr, serverConfig, generateApiRoutes());

		ucout << "Listening for requests at: " << addr << std::endl;
	}

	void shutDown() {
		g_http.reset();
	}

	core::router::HandleFunction generateApiRoutes() {
		core::router::Router mainRouter{};
		core::router::Router pricerRouter{};
		core::router::Router blackScholesRouter{};

		blackScholesRouter.get(str::route::CALL_ROUTE, [](const std::string& path, const std::string& method, const web::http::http_request& req) {
			request_handler::black_model_handler::BlackModelHandler::handlePrincingCall(req);
		});

		blackScholesRouter.get(str::route::PUT_ROUTE, [](const std::string& path, const std::string& method, const web::http::http_request& req) {
			request_handler::black_model_handler::BlackModelHandler::handlePricingPut(req);
		});

		pricerRouter.use(str::route::BLACK_SCHOLES_ROUTE, blackScholesRouter);
		
		mainRouter.use(str::route::BASE_ROUTE, pricerRouter);

		return mainRouter;
	}
}

