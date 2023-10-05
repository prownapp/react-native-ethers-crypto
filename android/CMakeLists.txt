project(react-native-ethers-crypto)

cmake_minimum_required(VERSION 3.4.1)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 11)

add_library(cpp
            SHARED
            ../cpp/react-native-ethers-crypto.cpp
            ../cpp/keccak/keccak256.cpp
            cpp-adapter.cpp
)

# Specifies a path to native header files.
include_directories(
            ../cpp
)

find_package(openssl REQUIRED CONFIG)
target_link_libraries(cpp openssl::crypto)