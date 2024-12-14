import { Footer } from "@/components/NonDashboard/footer";
import NonDashboardNavbar from "@/components/NonDashboard/non-dashboard-navbar";


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-background">
                  <NonDashboardNavbar />
            {children}
            <Footer />
        </div>


    );
}
