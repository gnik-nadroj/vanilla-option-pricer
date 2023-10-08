find_package(cpprestsdk REQUIRED)

set_target_properties(cpprestsdk::cpprestsdk_openssl_internal PROPERTIES
  INTERFACE_COMPILE_DEFINITIONS "CPPREST_NO_SSL_LEAK_SUPPRESS"
  INTERFACE_LINK_LIBRARIES "OpenSSL::SSL"
)