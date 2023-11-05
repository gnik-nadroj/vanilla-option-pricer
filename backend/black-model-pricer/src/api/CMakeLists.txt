add_library(api "api.cpp" "black-model-handler.cpp")

target_include_directories(api PUBLIC .)

target_link_libraries(api PRIVATE core)
target_link_libraries(api PRIVATE common)
target_link_libraries(api PRIVATE model)

include(CppRestSdk)

target_link_libraries(api PRIVATE cpprestsdk::cpprest)