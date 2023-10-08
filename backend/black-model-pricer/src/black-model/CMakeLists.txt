add_library(black-model "BlackScholes.cpp")
 
target_include_directories(black-model PUBLIC .)

target_link_libraries(black-model PRIVATE common)