#include <iostream>
#include <thread>
#include <vector>
#include <chrono>

using namespace std;

void taskA() {
    int i = 0;

    while (i < 10) {
        sleep(1);
        cout << i++ << endl;
    }
}

void taskB() {
    int i = 0;

    while (i < 10) {
        sleep(1);
        cout << i++ << endl;
    }
}

int main() {
    vector<thread> workers;

    // Spawn 5 concurrent worker threads
    for (int i = 1; i <= 5; ++i) {
        workers.push_back(std::thread(workerTask, i));
    }

    // Wait for all threads to finish execution
    for (auto& t : workers) {
        t.join();
    }

    std::cout << "All workers finished successfully.\n";
    return 0;
}