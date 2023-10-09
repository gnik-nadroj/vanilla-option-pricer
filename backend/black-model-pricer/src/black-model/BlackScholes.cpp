#include <BlackScholes.hpp>
#include <iostream>
#include <cmath>
#include <utils.h>


std::pair<double, double> BlackScholes::getD1AndD2(double strike, double spot, double interestRate, double volatility, double timeToMaturity)
{
	const auto timeSqrt = sqrt(timeToMaturity);

	const auto d1 = (log(spot / strike) + interestRate * timeToMaturity) / (volatility * timeSqrt) + 0.5 * volatility * timeSqrt;

	const auto d2 = d1 - (volatility * timeSqrt);

	return { d1, d2 };
}

double BlackScholes::call(double strike,  double spot, double interestRate, double volatility, double timeToMaturity)
{
	const auto& [d1, d2] = BlackScholes::getD1AndD2(strike, spot, interestRate, volatility, timeToMaturity);

	return spot * utils::N(d1) - strike * exp(-interestRate * timeToMaturity) * utils::N(d2);
}

double BlackScholes::put(double strike, double spot, double interestRate, double volatility, double timeToMaturity)
{
	const auto& [d1, d2] = BlackScholes::getD1AndD2(strike, spot, interestRate, volatility, timeToMaturity);

	return -spot * utils::N(-d1) + strike * exp(-interestRate * timeToMaturity) * utils::N(-d2);
}
