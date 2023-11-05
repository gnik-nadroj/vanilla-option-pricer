add_library(core "server.cpp" "router.cpp")

target_include_directories(core PUBLIC .)

target_link_libraries(core PRIVATE common)

include(CppRestSdk)

target_link_libraries(core PRIVATE cpprestsdk::cpprest)