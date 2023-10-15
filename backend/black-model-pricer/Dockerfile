FROM gcc:latest

WORKDIR /black-model-pricer

RUN apt-get update && apt-get install -y \
    libcpprest-dev \
    cmake \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN cmake -DCMAKE_BUILD_TYPE=Release . . && \
    cmake --build . --target all

CMD ["./main"]