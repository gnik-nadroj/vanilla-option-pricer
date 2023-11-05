add_library(model "black-model.cpp")
 
target_include_directories(model PUBLIC .)

target_link_libraries(model PRIVATE common)