#pragma once
#include "Router.h"
#include "RouterHandler.h"
#include "cpprest/http_listener.h"
#include <string>

class FunctionHandler: public RouteHandler
{
private:
	std::function<void(const web::http::http_request&)> handler;
public:
	FunctionHandler(const std::function<void(const web::http::http_request&)> &hdl);
	void handle(std::string path, const std::string&, const web::http::http_request& req);
};

