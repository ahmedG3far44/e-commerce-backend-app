import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import ProfilePage from "./pages/profile";
import CartPage from "./pages/cart";
import CheckoutPage from "./pages/checkout";
import NotFoundPage from "./pages/error";
import AuthProvider from "./context/AuthProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<HomePage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
