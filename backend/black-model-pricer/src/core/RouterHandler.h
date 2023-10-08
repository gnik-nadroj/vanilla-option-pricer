#pragma once
#include "Router.h"
#include <string>

class RouterHandler: public RouteHandler
{
public:
	RouterHandler(Router& rtr);
	void handle(std::string path, const std::string&, const web::http::http_request& req);
	
private:
	Router router;
};

