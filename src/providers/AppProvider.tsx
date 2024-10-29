import {Button} from "react-bootstrap";
import {ErrorBoundary} from "react-error-boundary";
import {HelmetProvider} from "react-helmet-async";
import {QueryClientProvider} from "react-query";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {queryClient} from "../libs/react-query.ts";


const ErrorFallback = () => {
    return (
        <div role="alert" style={{ alignItems: "center" }}>
            <h1 style={{color:"red"}}>
                Ooops, something went wrong :(
            </h1>
            <Button onClick={() => window.location.assign(window.location.origin)}>
                Refresh
            </Button>
        </div>
    );
};

type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <React.Suspense
            fallback={
                <div
                    style={{
                        width: "fit-content",
                        height: "fit-content",
                        margin: "auto",
                    }}
                >
                    <h1>Loading...</h1>
                </div>
            }
        >
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <HelmetProvider>
                            <QueryClientProvider client={queryClient}>
                                <BrowserRouter>{children}</BrowserRouter>
                            </QueryClientProvider>
                        </HelmetProvider>
                    </ErrorBoundary>
        </React.Suspense>
    );
};
