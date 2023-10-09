#pragma once

#include "RouteHandler.h"

#include <map>

#include <memory>

#include <cpprest/http_listener.h>



class Router
{
	private:
		std::map <std::string, std::map<std::string, std::shared_ptr<RouteHandler>>> routes;
		
	public:
		Router();
		void use(std::string, std::shared_ptr<RouteHandler>);
		void get(std::string, std::shared_ptr<RouteHandler>);
		void post(std::string, std::shared_ptr<RouteHandler>);

		void handle(web::http::http_request message, std::string path, std::string method);
};

