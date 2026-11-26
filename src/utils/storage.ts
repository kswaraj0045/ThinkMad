import { Badge } from '../types';
import { INITIAL_BADGES } from '../data/badgesData';

const BADGES_KEY = 'rutuja_badges_v1';
const DRAMA_KEY = 'rutuja_drama_level';
const VISITS_KEY = 'rutuja_visit_count';
const LAST_VISIT_KEY = 'rutuja_last_visit';

export const storage = {
  getBadges(): Badge[] {
    try {
      const data = localStorage.getItem(BADGES_KEY);
      if (!data) return INITIAL_BADGES;
      const parsed: Badge[] = JSON.parse(data);
      // Merge with INITIAL_BADGES to ensure new badges exist
      return INITIAL_BADGES.map(initial => {
        const found = parsed.find(p => p.id === initial.id);
        return found ? found : initial;
      });
    } catch {
      return INITIAL_BADGES;
    }
  },

  unlockBadge(badgeId: string): Badge | null {
    try {
      const badges = this.getBadges();
      const badge = badges.find(b => b.id === badgeId);
      if (badge && !badge.unlockedAt) {
        badge.unlockedAt = new Date().toISOString();
        localStorage.setItem(BADGES_KEY, JSON.stringify(badges));
        return badge;
      }
      return null;
    } catch {
      return null;
    }
  },

  getDramaLevel(): number {
    try {
      const saved = localStorage.getItem(DRAMA_KEY);
      return saved !== null ? parseInt(saved, 10) : 55;
    } catch {
      return 55;
    }
  },

  setDramaLevel(val: number) {
    try {
      localStorage.setItem(DRAMA_KEY, val.toString());
    } catch {
      // ignore
    }
  },

  recordVisit(): number {
    try {
      const count = parseInt(localStorage.getItem(VISITS_KEY) || '0', 10) + 1;
      localStorage.setItem(VISITS_KEY, count.toString());
      localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
      return count;
    } catch {
      return 1;
    }
  },

  getVisitCount(): number {
    try {
      return parseInt(localStorage.getItem(VISITS_KEY) || '1', 10);
    } catch {
      return 1;
    }
  }
};
