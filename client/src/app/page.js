"use client";

import { motion } from "framer-motion";
import DashboardView from "@/views/DashboardView";

const SMOOTH_EASE = [0.22, 1, 0.36, 1];

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: SMOOTH_EASE }}
    >
      <DashboardView />
    </motion.div>
  );
}
