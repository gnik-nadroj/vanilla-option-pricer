#include "server.hpp"
#include <str.hpp>

namespace pricer::core {
	Server::Server(const std::string& url, const web::http::experimental::listener::http_listener_config& config, const router::HandleFunction& hdlr): 
		m_listener{url, config}, m_requestHandler{std::move(hdlr)}
	{
		m_listener.support(web::http::methods::GET, std::bind(&Server::HandleGet, this, std::placeholders::_1));
		m_listener.support(web::http::methods::POST, std::bind(&Server::HandlePost, this, std::placeholders::_1));
		m_listener.open();
	}

	Server::~Server()
	{
		m_listener.close().wait();
	}

	void Server::HandleGet(const web::http::http_request& message)
	{
		m_requestHandler(message.absolute_uri().path(),  str::router::GET, message);
	};

	void Server::HandlePost(const web::http::http_request& message)
	{
		m_requestHandler(message.absolute_uri().path(), str::router::POST, message);
	};
}

