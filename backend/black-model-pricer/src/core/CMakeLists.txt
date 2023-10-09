add_library(core "PricingServer.cpp" "Router.cpp" "RouteHandler.cpp" "RouterHandler.cpp" "FunctionHandler.cpp")

target_include_directories(core PUBLIC .)

include(CppRestSdk)

target_link_libraries(core PRIVATE common)
target_link_libraries(core PRIVATE cpprestsdk::cpprest)