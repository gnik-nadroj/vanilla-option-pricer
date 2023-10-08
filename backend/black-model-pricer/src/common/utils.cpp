#include "utils.h"
#include <cmath>

double utils::N(const double& val)
{
    if (val > 6.0) { return 1.0; }

    if (val < -6.0) { return 0.0; }

    const auto b1{ 0.31938153 };
    const auto b2{ 0.356563782 * -1 };
    const auto b3 { 1.781477937 };
    const auto b4{ 1.821255978 * -1 };
    const auto b5{ 1.330274429 };
    const auto p{ 0.2316419 };
    const auto c2{ 0.3989423 };

    const auto a = fabs(val); //absolute value
    const auto t = 1.0 / (1.0 + a * p);
    const auto b = c2 * exp((-val) * (val / 2.0));

    auto n = ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
    n = 1.0 - b * n;
    

    return val < 0.0 ? (1.0 - n) : n;
}

std::string utils::f_split(const std::string& str, const std::string& delim)
{
    std::string result{ str[0] };
    for (size_t i = 1; std::string(1,str[i]) != delim && i < str.size(); i++)
    {
        result += str[i];
    }

    return result;
}
