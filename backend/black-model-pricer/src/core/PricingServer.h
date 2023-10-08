#pragma once

#include "cpprest/json.h"
#include "cpprest/http_listener.h"
#include "Router.h"


class PricingServer
{
public:
	PricingServer(utility::string_t url, Router rtr, web::http::experimental::listener::http_listener_config config);
	~PricingServer() {}
	pplx::task<void> Open() { return m_listener.open(); }
	pplx::task<void> Close() { return m_listener.close(); }
	Router router;


private:
	//--- Handlers for HTTP verbs
	void HandleGet(web::http::http_request message);
	void HandlePost(web::http::http_request message);

	//--------------- The  HTTP listener class
	web::http::experimental::listener::http_listener m_listener;
};

