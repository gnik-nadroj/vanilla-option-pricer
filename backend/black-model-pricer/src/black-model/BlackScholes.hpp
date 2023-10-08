#pragma once
#include <map>

class BlackScholes
{
	public:
		static std::pair<double, double> getD1AndD2(double strike, double spot, double interestRate, double volatility, double timeToMaturity);
		static double call(double strike, double spot, double interestRate, double volatility, double timeToMaturity);
		static double put(double strike, double spot, double interestRate, double volatility, double timeToMaturity);
};

