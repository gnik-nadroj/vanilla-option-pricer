#pragma once
#include <map>
#include <string>
#include <vector>


namespace utils {
	/// <summary>
	///		A function who calculate the cumulative normal function
	/// </summary>
	/// <param name="val"> some value</param>
	/// <returns>cumulative normal function of the value</returns>
	double N(const double& val);

	/// <summary>
	///		A function who split a string given a delimiter and return the first occurence of the result
	/// </summary>
	/// <param name="str">the string</param>
	/// <param name="delim">the delimiter</param>
	/// <returns>the first occurence of the splited string </returns>
	std::string f_split(const std::string& str, const std::string& delim);
}
