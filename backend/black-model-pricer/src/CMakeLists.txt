add_executable(main "main.cpp")

add_subdirectory(common)
add_subdirectory(model)
add_subdirectory(core)
add_subdirectory(api)

target_link_libraries(main PRIVATE common)
target_link_libraries(main PRIVATE core)
target_link_libraries(main PRIVATE api)

