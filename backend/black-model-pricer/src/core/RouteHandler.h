#pragma once
#include "cpprest/http_listener.h"
#include <string>

class RouteHandler
{
public:
	virtual void handle(std::string, const std::string&, const web::http::http_request&);
};

