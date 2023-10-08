#include "Router.h"

#include "RouterHandler.h"
#include "FunctionHandler.h"

#include "utils.h"



Router::Router()
{
	routes["router"].insert({ });
	routes["get"].insert({ });
	routes["post"].insert({ });
}

void Router::use(std::string path, std::shared_ptr<RouteHandler> hdlr)
{
	routes["router"].insert({ path, hdlr });
}

void Router::get(std::string path, std::shared_ptr<RouteHandler> hdlr )
{
	routes["get"].insert({ path, hdlr });
}

void Router::post(std::string path, std::shared_ptr<RouteHandler> hdlr)
{
	routes["post"].insert({ path, hdlr });
}

void Router::handle(web::http::http_request message, std::string path, std::string method)
{
	auto currRoute = utils::f_split(path, "/");

	path.erase(0, currRoute.size());

	if (auto itr = routes[method].find(currRoute); itr != routes[method].end())
		std::dynamic_pointer_cast<FunctionHandler>(itr->second)->handle(path, method, message);

	else if (auto itr = routes["router"].find(currRoute); itr != routes["router"].end())
		std::dynamic_pointer_cast<RouterHandler>(itr->second)->handle(path, method, message);
	
	else 
		message.reply(web::http::status_codes::NotFound, "route not found");
}
