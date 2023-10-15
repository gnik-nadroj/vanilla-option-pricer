cmake_minimum_required(VERSION 3.20.0)
project(black-model_pricer VERSION 1.0.0 LANGUAGES CXX)
list(APPEND CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake")

set(CMAKE_CXX_STANDARD 17)

add_subdirectory(src bin)
