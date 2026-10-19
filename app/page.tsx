"use client";

import { Button, Column, Grid, PageHeader, Tag, Theme, Tile } from "@/src/design-system";

export default function HomePage() {
  return (
    <Theme theme="white">
      <main className="cds--content">
        <PageHeader
          title="Kosmos Cortex"
          subtitle="A secure, versioned workspace built on IBM Carbon."
        />
        <Grid fullWidth>
          <Column sm={4} md={8} lg={16}>
            <Tile>
              <Tag type="green">Design system connected</Tag>
              <h2>IBM Carbon foundation</h2>
              <p>
                This workspace uses official Carbon components and IBM Products
                patterns. New interface work must follow the repository design
                system baseline and its reviewed exception process.
              </p>
              <Button
                href="https://carbondesignsystem.com/"
                kind="tertiary"
              >
                Read Carbon documentation
              </Button>
            </Tile>
          </Column>
        </Grid>
      </main>
    </Theme>
  );
}
