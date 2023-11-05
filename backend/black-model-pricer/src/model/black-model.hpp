#pragma once

namespace pricer::model::black_model {
	double call(double strike, double spot, double interestRate, double volatility, double timeToMaturity);
	double put(double strike, double spot, double interestRate, double volatility, double timeToMaturity);
}


