add_library(common INTERFACE
	"strConstant.h"
    "utils.cpp"
)

target_include_directories(common INTERFACE .)