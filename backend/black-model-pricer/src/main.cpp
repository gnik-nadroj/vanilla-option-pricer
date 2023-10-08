// SimpleServer.cpp : Defines the entry point for the console application.
//


#include "App.h"

#include <iostream>

#include "strConstant.h"

int main(int argc, char* argv[])
{
	utility::string_t port;
	if(argc == 2)
		port = utility::conversions::to_string_t(argv[1]);
	else
		port =  utility::conversions::to_string_t(str::app::PORT);

	app::StartServer(port);
	std::cout << "Press ENTER q or Q to exit." << std::endl;

	//--- Wait Indefenintely, Untill some one has 
	// pressed a key....and Shut the Server down
	std::string line;
	
	while (line != "Q" || line !="q") {
		std::getline(std::cin, line);
	}
	app::ShutDown();
}