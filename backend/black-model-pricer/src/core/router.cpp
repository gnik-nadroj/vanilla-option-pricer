#include "router.hpp"

#include <str.hpp>
#include <utils.hpp>


namespace pricer::core::router {
	Router::Router()
	{
		routes[str::router::ROUTER].insert({ });
		routes[str::router::GET].insert({ });
		routes[str::router::POST].insert({ });
	}

	void Router::use(const std::string& path, const HandleFunction& hdlr)
	{
		routes[str::router::ROUTER].insert({ path, hdlr });
	}

	void Router::get(const std::string& path, const HandleFunction& hdlr )
	{
		routes[str::router::GET].insert({ path, hdlr });
	}

	void Router::post(const std::string& path, const HandleFunction& hdlr)
	{
		routes[str::router::POST].insert({ path, hdlr });
	}

	void Router::operator()(const std::string& path, const std::string& method, const web::http::http_request& req)
	{
		auto newPath {path};
		auto currRoute = pricer::utils::f_split(path, "/");
		newPath.erase(0, currRoute.size());

		if (routes[method].contains(currRoute)) {
			auto handler = routes[method][currRoute];
			handler(newPath, method, req);
		} else if (routes["router"].contains(currRoute)) {
			auto handler = routes[str::router::ROUTER][currRoute];
			handler(newPath, method, req);
		} else {
			req.reply(web::http::status_codes::NotFound, str::error::NOT_FOUND);
		}	
	}
}
