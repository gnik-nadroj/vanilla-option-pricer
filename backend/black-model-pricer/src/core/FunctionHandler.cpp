#include "FunctionHandler.h"

FunctionHandler::FunctionHandler(const std::function<void(const web::http::http_request&)> &hdl)
{
	handler = hdl;
}

void FunctionHandler::handle(std::string path, const std::string& method, const web::http::http_request& req)
{
	handler(req);
}
