#include "PricingServer.h"
#include "cpprest/json.h"
#include "cpprest/http_listener.h"
#include "cpprest/uri.h"
#include "cpprest/asyncrt_utils.h"
#include <map>


//////////////////////////////////
// The Constructor Binds HTTP verbs to instance methods
// Based on the naming convention, we can infer what is happening
PricingServer::PricingServer(utility::string_t url, Router rtr, web::http::experimental::listener::http_listener_config config): m_listener(url, config)
{
	m_listener.support(web::http::methods::GET, std::bind(&PricingServer::HandleGet, this, std::placeholders::_1));
	m_listener.support(web::http::methods::POST, std::bind(&PricingServer::HandlePost, this, std::placeholders::_1));
	router = rtr;
}

void PricingServer::HandleGet(web::http::http_request message)
{
	router.handle(message, utility::conversions::to_utf8string(message.absolute_uri().path()),  "get");
};

void PricingServer::HandlePost(web::http::http_request message)
{
	router.handle(message, utility::conversions::to_utf8string(message.absolute_uri().path()), "post");
};

