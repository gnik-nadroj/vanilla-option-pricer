#include "black-model.hpp"

#include <utils.hpp>

#include <iostream>
#include <cmath>

namespace pricer::model::black_model {
	static std::pair<double, double> getD1AndD2(double strike, double spot, double interestRate, double volatility, double timeToMaturity)
	{
		const auto timeSqrt = sqrt(timeToMaturity);

		const auto d1 = (log(spot / strike) + interestRate * timeToMaturity) / (volatility * timeSqrt) + 0.5 * volatility * timeSqrt;

		const auto d2 = d1 - (volatility * timeSqrt);

		return std::make_pair(d1, d2);
	}

	double call(double strike,  double spot, double interestRate, double volatility, double timeToMaturity)
	{
		const auto [d1, d2] = getD1AndD2(strike, spot, interestRate, volatility, timeToMaturity);

		return spot * pricer::utils::N(d1) - strike * exp(-interestRate * timeToMaturity) * pricer::utils::N(d2);
	}

	double put(double strike, double spot, double interestRate, double volatility, double timeToMaturity)
	{
		const auto [d1, d2] = getD1AndD2(strike, spot, interestRate, volatility, timeToMaturity);

		return -spot * pricer::utils::N(-d1) + strike * exp(-interestRate * timeToMaturity) * pricer::utils::N(-d2);
	}
}



