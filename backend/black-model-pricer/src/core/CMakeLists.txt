add_library(core "PricingServer.cpp" "Router.cpp" "RouteHandler.cpp" "RouterHandler.cpp" "FunctionHandler.cpp")

include(CppRestSdk)

target_link_libraries(core PRIVATE common)
target_link_libraries(core PRIVATE cpprestsdk::cpprest)