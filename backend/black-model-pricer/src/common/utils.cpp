#include "utils.hpp"

#include <cmath>

double pricer::utils::N(double val)
{
    if (val > 6.0) { return 1.0; }

    if (val < -6.0) { return 0.0; }

    constexpr auto b1{ 0.31938153 };
    constexpr auto b2{ 0.356563782 * -1 };
    constexpr auto b3 { 1.781477937 };
    constexpr auto b4{ 1.821255978 * -1 };
    constexpr auto b5{ 1.330274429 };
    constexpr auto p{ 0.2316419 };
    constexpr auto c2{ 0.3989423 };

    const auto a = fabs(val); //absolute value
    const auto t = 1.0 / (1.0 + a * p);
    const auto b = c2 * exp((-val) * (val / 2.0));

    auto n = ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;

    n = 1.0 - b * n;
    
    return val < 0.0 ? (1.0 - n) : n;
}

std::string pricer::utils::f_split(const std::string& str, const std::string& delim)
{
    std::string result{ str[0] };
    
    for (size_t i = 1; std::string(1,str[i]) != delim && i < str.size(); i++)
    {
        result += str[i];
    }

    return result;
}
