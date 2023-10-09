add_library(api "App.cpp" "BlackScholesHandler.cpp")

target_include_directories(api PUBLIC .)

target_link_libraries(api PRIVATE common)
target_link_libraries(api PRIVATE black-model)
target_link_libraries(api PRIVATE core)
