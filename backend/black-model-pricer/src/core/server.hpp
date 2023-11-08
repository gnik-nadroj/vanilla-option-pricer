#pragma once

#include "router.hpp"

#include <cpprest/http_listener.h>

namespace pricer::core {
	class Server
	{
	public:
		Server(const std::string& url, const web::http::experimental::listener::http_listener_config& config, const router::HandleFunction& hdlr);
		~Server();

	private:
		void HandleGet(const web::http::http_request& message);
		void HandlePost(const web::http::http_request& message);

		router::HandleFunction m_requestHandler;
		web::http::experimental::listener::http_listener m_listener;
	};
}


