#pragma once

#include <cpprest/http_listener.h>

#include <unordered_map>

namespace pricer::core::router {
	using HandleFunction = std::function<void(const std::string& path, const std::string& method, const web::http::http_request& req)>;
	class Router
	{
		private:
			std::unordered_map <std::string, std::unordered_map<std::string, HandleFunction>> routes {};
			
		public:
			Router();
			void use(const std::string&, const HandleFunction&);
			void get(const std::string&, const HandleFunction&);
			void post(const std::string&, const HandleFunction&);

			void operator()(const std::string& path, const std::string& method, const web::http::http_request& req);
	};
}



