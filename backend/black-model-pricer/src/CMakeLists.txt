add_executable(main "main.cpp")

add_subdirectory(common)
add_subdirectory(black-model)
add_subdirectory(core)
add_subdirectory(api)

target_link_libraries(main PRIVATE common)

