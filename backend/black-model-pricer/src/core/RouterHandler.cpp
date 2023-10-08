#include "RouterHandler.h"

RouterHandler::RouterHandler(Router& rtr)
{
	router = rtr;
}

void RouterHandler::handle(std::string path, const std::string& method, const web::http::http_request& req)
{
	router.handle(req, path, method);
}
