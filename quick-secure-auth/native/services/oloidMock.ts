/**
 * Mocked Oloid Face Authentication Service
 * Simulates POST /credentials/face/login + liveness check
 * Replace with real Oloid API calls once credentials are available.
 */

export interface OloidUser {
  id: string;
  name: string;
  firstName: string;
  role: string;
  avatarInitials: string;
  confidence: number;
}

export interface OloidResult {
  success: boolean;
  user?: OloidUser;
  error?: 'NOT_RECOGNIZED' | 'NOT_ENROLLED' | 'LIVENESS_FAILED' | 'NETWORK_ERROR';
}

// Simulated enrolled users — swap in real Oloid response shape when live
const MOCK_USER: OloidUser = {
  id: 'usr_SR_001',
  name: 'Seth Rogen',
  firstName: 'Seth',
  role: 'Senior Inspector',
  avatarInitials: 'SR',
  confidence: 0.97,
};

/**
 * Simulates the Oloid face auth API call.
 * 1.8s latency to mirror a real server-side liveness + face compare round-trip.
 * Always succeeds in this mock — set FORCE_FAIL=true to test the failure state.
 */
export function mockFaceAuth(FORCE_FAIL = false): Promise<OloidResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (FORCE_FAIL) {
        resolve({ success: false, error: 'NOT_RECOGNIZED' });
      } else {
        resolve({ success: true, user: MOCK_USER });
      }
    }, 1800);
  });
}
