// SimpleServer.cpp : Defines the entry point for the console application.
//

#include <api.hpp>

#include <str.hpp>

#include <iostream>


int main(int argc, char* argv[])
{
	utility::string_t port;

	if(argc == 2)
		port = utility::conversions::to_string_t(argv[1]);
	else
		port =  utility::conversions::to_string_t(pricer::str::config::PORT);

	pricer::api::startServer(port);
	std::cout << "Press ENTER q or Q to exit." << std::endl;

	std::string line;
	
	while (line != "Q" || line !="q") {
		std::getline(std::cin, line);
	}
	pricer::api::shutDown();
}